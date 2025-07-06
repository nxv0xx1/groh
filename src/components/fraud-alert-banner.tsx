import { AlertTriangle } from "lucide-react";

export function FraudAlertBanner() {
  return (
    <div className="bg-yellow-400/80 text-yellow-900 px-4 py-3" role="alert">
      <div className="container mx-auto flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
        <p className="text-sm font-semibold text-center">
          <span className="font-bold">Beware of fraudsters.</span> Only donate through the official channels provided on this website.
        </p>
      </div>
    </div>
  );
}
