import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { DownloadSummaryButton } from "./downlaod-summary-button";
import { MotionDiv } from "../common/motion-wrapper";
import { fadeInUp } from "@/utils/motionConfig";

export function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <MotionDiv initial={{opacity:0,y:20}} animate={{opacity:1,y:0,transition:{delay:0.8}}} className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a
            href={originalFileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </MotionDiv>
  );
}
