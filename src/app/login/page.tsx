import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-blue-100 relative hidden md:block">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/ab/35/7f/ab357f0016e5c66e6ea85ea5d06db0dd.jpg')",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-white text-3xl font-bold drop-shadow-lg">Río Motagua</h2>
          <p className="text-white text-lg mt-2 max-w-md drop-shadow-lg">
            WaterWay+: Protegiendo nuestros recursos hídricos
          </p>
        </div>
      </div>
    </div>
  )
}
