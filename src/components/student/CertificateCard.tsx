import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Award, Calendar, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export interface Certificate {
  id: string;
  courseTitle: string;
  completionDate: string;
  studentName: string;
}

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const [downloading, setDownloading] = useState(false);

  const generatePDFs = async () => {
    setDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Background
      doc.setFillColor(250, 250, 252);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Border decorative
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(3);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      doc.setDrawColor(147, 197, 253);
      doc.setLineWidth(1);
      doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

      // Header decoration
      doc.setFillColor(59, 130, 246);
      doc.rect(10, 10, pageWidth - 20, 8, "F");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(36);
      doc.setTextColor(30, 58, 138);
      doc.text("CERTIFICAT DE RÉUSSITE", pageWidth / 2, 55, {
        align: "center",
      });

      // Decorative line under title
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(2);
      doc.line(pageWidth / 2 - 60, 62, pageWidth / 2 + 60, 62);

      // "Ce certificat est décerné à"
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(100, 116, 139);
      doc.text("Ce certificat est décerné à", pageWidth / 2, 80, {
        align: "center",
      });

      // Student name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(30, 58, 138);
      doc.text(certificate.studentName, pageWidth / 2, 95, { align: "center" });

      // "pour avoir complété avec succès"
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(100, 116, 139);
      doc.text("pour avoir complété avec succès le cours", pageWidth / 2, 115, {
        align: "center",
      });

      // Course title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(59, 130, 246);
      doc.text(certificate.courseTitle, pageWidth / 2, 130, {
        align: "center",
      });

      // Date
      const formattedDate = format(
        new Date(certificate.completionDate),
        "d MMMM yyyy",
        { locale: fr }
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text(`Délivré le ${formattedDate}`, pageWidth / 2, 150, {
        align: "center",
      });

      // Footer decoration
      doc.setFillColor(59, 130, 246);
      doc.rect(10, pageHeight - 18, pageWidth - 20, 8, "F");

      // Certificate ID
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`ID: ${certificate.id}`, pageWidth / 2, pageHeight - 25, {
        align: "center",
      });

      // Save PDF
      doc.save(
        `certificat-${certificate.courseTitle
          .toLowerCase()
          .replace(/\s+/g, "-")}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  const generatePDF = async () => {
    setDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Background with subtle gradient effect
      doc.setFillColor(250, 250, 252);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Elegant border design
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(4);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      doc.setDrawColor(147, 197, 253);
      doc.setLineWidth(1.5);
      doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

      // Corner decorations
      const cornerSize = 15;
      doc.setFillColor(59, 130, 246);
      // Top left corner
      doc.circle(10, 10, 3, "F");
      // Top right corner
      doc.circle(pageWidth - 10, 10, 3, "F");
      // Bottom left corner
      doc.circle(10, pageHeight - 10, 3, "F");
      // Bottom right corner
      doc.circle(pageWidth - 10, pageHeight - 10, 3, "F");

      // Method 2: Placeholder logo circle (replace with actual logo)
      doc.setFillColor(59, 130, 246);
      doc.circle(pageWidth / 2, 35, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("LOGO", pageWidth / 2, 37, { align: "center" });

      // Organization name (if you have one)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(59, 130, 246);
      doc.text("VOTRE ORGANISATION", pageWidth / 2, 52, { align: "center" });

      // Title with shadow effect
      doc.setFont("helvetica", "bold");
      doc.setFontSize(38);
      doc.setTextColor(200, 200, 200);
      doc.text("CERTIFICAT DE RÉUSSITE", pageWidth / 2 + 0.5, 70.5, {
        align: "center",
      });
      doc.setTextColor(30, 58, 138);
      doc.text("CERTIFICAT DE RÉUSSITE", pageWidth / 2, 70, {
        align: "center",
      });

      // Decorative line under title with ornaments
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(2);
      doc.line(pageWidth / 2 - 70, 76, pageWidth / 2 + 70, 76);

      // Small decorative circles on the line
      doc.setFillColor(59, 130, 246);
      doc.circle(pageWidth / 2 - 70, 76, 2, "F");
      doc.circle(pageWidth / 2 + 70, 76, 2, "F");
      doc.circle(pageWidth / 2, 76, 2, "F");

      // "Ce certificat est décerné à"
      doc.setFont("helvetica", "italic");
      doc.setFontSize(14);
      doc.setTextColor(100, 116, 139);
      doc.text("Ce certificat est décerné à", pageWidth / 2, 90, {
        align: "center",
      });

      // Student name with decorative underline
      doc.setFont("helvetica", "bold");
      doc.setFontSize(32);
      doc.setTextColor(30, 58, 138);
      doc.text(certificate.studentName, pageWidth / 2, 107, {
        align: "center",
      });

      // Decorative underline for name
      const nameWidth = doc.getTextWidth(certificate.studentName);
      doc.setDrawColor(147, 197, 253);
      doc.setLineWidth(1);
      doc.line(
        pageWidth / 2 - nameWidth / 2,
        110,
        pageWidth / 2 + nameWidth / 2,
        110
      );

      // "pour avoir complété avec succès"
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(100, 116, 139);
      doc.text("pour avoir complété avec succès le cours", pageWidth / 2, 125, {
        align: "center",
      });

      // Course title in a box
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(pageWidth / 2 - 80, 130, 160, 15, 3, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246);
      doc.text(certificate.courseTitle, pageWidth / 2, 140, {
        align: "center",
      });

      // Date with icon
      const formattedDate = format(
        new Date(certificate.completionDate),
        "d MMMM yyyy",
        { locale: fr }
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text(`Délivré le ${formattedDate}`, pageWidth / 2, 160, {
        align: "center",
      });

      // Signature section
      const sigY = pageHeight - 45;

      // Left signature (e.g., Instructor)
      doc.setDrawColor(100, 116, 139);
      doc.setLineWidth(0.5);
      doc.line(40, sigY, 90, sigY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Instructeur", 65, sigY + 6, { align: "center" });

      // Right signature (e.g., Director)
      doc.line(pageWidth - 90, sigY, pageWidth - 40, sigY);
      doc.text("Directeur", pageWidth - 65, sigY + 6, { align: "center" });

      // Certificate ID with QR code placeholder
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Certificat ID: ${certificate.id}`,
        pageWidth / 2,
        pageHeight - 25,
        {
          align: "center",
        }
      );

      // Optional: Add QR code for verification
      // You can use a QR code library like qrcode to generate QR code
      /*
    const qrCodeData = await QRCode.toDataURL(`https://verify.example.com/${certificate.id}`);
    doc.addImage(qrCodeData, 'PNG', pageWidth - 35, pageHeight - 35, 20, 20);
    */

      // Footer decoration
      doc.setFillColor(59, 130, 246);
      doc.rect(10, pageHeight - 18, pageWidth - 20, 8, "F");

      // Website or additional info
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("www.votre-site.com", pageWidth / 2, pageHeight - 12, {
        align: "center",
      });

      // Save PDF
      doc.save(
        `certificat-${certificate.courseTitle
          .toLowerCase()
          .replace(/\s+/g, "-")}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  // Helper function to load and convert logo to base64
  async function loadLogoAsBase64(logoUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = logoUrl;
    });
  }

  return (
    <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-purple-600/10 to-purple-600/5 p-4 border-b">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-purple-600" />
          <Badge variant="secondary">Certificat</Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">
            {certificate.courseTitle}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Obtenu le{" "}
              {format(new Date(certificate.completionDate), "d MMMM yyyy", {
                locale: fr,
              })}
            </span>
          </div>
        </div>

        <Button
          onClick={generatePDF}
          disabled={downloading}
          className="w-full bg-purple-500 text-white"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Génération...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Télécharger le PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
