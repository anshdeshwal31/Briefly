import Link from "next/link";
import BgGradient from "./bg-gradient";
import PromptSubscriptionCard from "./prompt-subscription";

const SubscriptionPrompt = () => {
  return (
    <div className="relative min-h-screen  flex items-center justify-center p-4 sm:p-6">
      {/* Background gradient with overlay */}
      {/* <BgGradient className="absolute inset-0 opacity-60" /> */}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl"></div>
      </div>
      
        <PromptSubscriptionCard/>
    </div>
  );
};

export default SubscriptionPrompt;