import { useState, useEffect, useRef } from "react"

interface MapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  apiKey?: string;
  useCurrentLocation?: boolean; // Nueva prop para indicar si se usa la ubicación actual
  currentLocation?: { lat: number; lng: number } | null; // Ubicación actual del dispositivo
}

export default function MapSelector({
  onLocationSelect,
  initialLocation,
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  useCurrentLocation = false,
  currentLocation,
}: MapSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation || null
  );
  const [mounted, setMounted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Función para cargar el script de Google Maps
  const loadGoogleMapsScript = () => {
    if (window.google?.maps) {
      initializeMap();
      return;
    }

    const googleApiKey = apiKey || "";
    if (!googleApiKey) {
      console.error("No se ha proporcionado una clave de API para Google Maps");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  // Inicializar el mapa de Google
  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultLocation = currentLocation || initialLocation || { lat: 15.4842, lng: -89.1425 };

    const mapOptions: google.maps.MapOptions = {
      center: defaultLocation,
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
    };

    const map = new google.maps.Map(mapRef.current, mapOptions);
    googleMapRef.current = map;

    if (currentLocation || initialLocation) {
      createOrUpdateMarker(currentLocation || initialLocation!);
    }

    // Solo permitir clics en el mapa si no se usa la ubicación actual
    if (!useCurrentLocation) {
      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          createOrUpdateMarker(newLocation);
          setSelectedLocation(newLocation);
          onLocationSelect(newLocation);
        }
      });
    }

    setMapLoaded(true);
  };

  // Crear o actualizar el marcador
  const createOrUpdateMarker = (location: { lat: number; lng: number }) => {
    if (!googleMapRef.current) return;

    if (markerRef.current) {
      markerRef.current.setPosition(location);
    } else {
      const marker = new google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        animation: google.maps.Animation.DROP,
        draggable: !useCurrentLocation, // Deshabilitar arrastre si usa ubicación actual
      });

      if (!useCurrentLocation) {
        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            const newLocation = {
              lat: position.lat(),
              lng: position.lng(),
            };
            setSelectedLocation(newLocation);
            onLocationSelect(newLocation);
          }
        });
      }

      markerRef.current = marker;
    }
  };

  useEffect(() => {
    setMounted(true);
    if (initialLocation || currentLocation) {
      onLocationSelect(initialLocation || currentLocation!);
    }
  }, [initialLocation, currentLocation, onLocationSelect]);

  useEffect(() => {
    if (mounted) {
      loadGoogleMapsScript();
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (mapLoaded && googleMapRef.current) {
      if (currentLocation) {
        createOrUpdateMarker(currentLocation);
        googleMapRef.current.setCenter(currentLocation);
        setSelectedLocation(currentLocation);
        onLocationSelect(currentLocation);
      } else if (initialLocation) {
        createOrUpdateMarker(initialLocation);
        googleMapRef.current.setCenter(initialLocation);
      }
    }
  }, [currentLocation, initialLocation, mapLoaded, onLocationSelect]);

  if (!mounted) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96">
      <div ref={mapRef} className="absolute inset-0" />
      {selectedLocation && (
        <div className="absolute bottom-20 right-4 bg-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <p className="font-medium">Coordenadas:</p>
          <p>Lat: {selectedLocation.lat.toFixed(6)}</p>
          <p>Lng: {selectedLocation.lng.toFixed(6)}</p>
        </div>
      )}
      {!useCurrentLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-sm">
          <p className="text-gray-700">
            Haz clic en el mapa para seleccionar la ubicación exacta del problema o arrastra el marcador para ajustar.
          </p>
        </div>
      )}
    </div>
  );
}