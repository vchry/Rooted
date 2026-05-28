export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center p-6">
        
        <h1 className="mb-8 text-5xl font-bold">
          Focus Garden
        </h1>

        <div className="grid w-full gap-6 md:grid-cols-3">
          
          <div className="rounded-2xl bg-slate-900 p-6">
            Timer Section
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            Plant Section
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            History Section
          </div>

        </div>
      </div>
    </div>
  );
}