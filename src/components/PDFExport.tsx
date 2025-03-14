
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";
import { AIModelReport } from "@/utils/reportData";
import { generateReportPDF, setupPdfDependencies } from "@/utils/pdfUtils";

interface PDFExportProps {
  report: AIModelReport;
}

export const PDFExport = ({ report }: PDFExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await setupPdfDependencies();
      generateReportPDF(report.report, report.model.name);
      toast({
        title: "Success",
        description: "Your report has been downloaded as a PDF",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 bg-primary/90 hover:bg-primary transition-colors"
    >
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : "Download PDF"}
    </Button>
  );
};
