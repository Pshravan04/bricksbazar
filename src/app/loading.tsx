export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-white">
      <div className="w-12 h-12 border-4 border-brand-red-light border-t-brand-red rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-brand-text-secondary animate-pulse">
        Loading BricksBazar portal...
      </p>
    </div>
  );
}

