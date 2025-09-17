import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Vite compatible

export default function ExportBooksPDF({ books }) {
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFontSize(18);
    doc.text("Books Report", 40, 40);

    const columns = ["ID", "Title", "Author", "Genres", "Reviews"];
    const rows = books.map((b) => [
      b.id ?? "-",
      b.title ?? "-",
      b.author ?? "-",
      b.genres?.map((g) => g.name).join(", ") || "-",
      b.reviews?.length ?? 0,
    ]);

    autoTable(doc, { // call autoTable with doc as first argument
      head: [columns],
      body: rows,
      startY: 60,
      styles: { fontSize: 12 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("books-report.pdf");
  };

  return <button onClick={exportPDF}>Export PDF</button>;
}
