import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="h-5 w-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
