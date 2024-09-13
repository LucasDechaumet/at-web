import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class QrCodeService {
  private companyPrefix = "361638"; // Armand Thiery

  constructor() {}

  getEpcAndEanFromQrCode(qrCodeValue: string): { [key: string]: string } | null {
    const item: { [key: string]: string } = {};

    if (
      qrCodeValue &&
      qrCodeValue.startsWith("https") &&
      qrCodeValue.includes("/01/") &&
      qrCodeValue.includes("/21/") &&
      qrCodeValue.includes("/240/")
    ) {
      const data1 = qrCodeValue.split("/01/");
      const data2 = data1[1].split("/21/");
      const ean = data2[0].substring(1);

      const data3 = data2[1].split("/240/");
      const num = data3[0];

      // Encode le EPC à partir de l'EAN et du numéro
      const epc = this.encodeEpc(ean, parseInt(num, 10));

      // Ajoute les valeurs au résultat
      item["ean"] = ean.toUpperCase();
      item["epc"] = epc.toUpperCase();

      return item;
    } else {
      console.error("QR Code invalide");
      return null;
    }
  }

  encodeEpc(item: string, serialNumber: number): string {
    let itemReference = item;

    // Vérifie si l'article commence par le préfixe de l'entreprise
    if (itemReference.length === 13 && itemReference.startsWith(this.companyPrefix)) {
      itemReference = itemReference.substring(
        this.companyPrefix.length,
        this.companyPrefix.length + 6
      );
    }

    // Partition 6: 20 bits pour le préfixe de l'entreprise, 24 bits pour la référence de l'article
    const companyPrefixBits = 20;
    const itemReferenceBits = 24;

    // Convertit les valeurs en binaire
    const binaryFilterValue = this.padBinaryString((1).toString(2), 3);
    const binaryCompanyPrefix = this.padBinaryString(
      parseInt(this.companyPrefix, 10).toString(2),
      companyPrefixBits
    );
    const binaryItemReference = this.padBinaryString(
      parseInt(itemReference, 10).toString(2),
      itemReferenceBits
    );
    const binarySerialNumber = this.padBinaryString(serialNumber.toString(2), 38);

    // Construit l'EPC
    const epcBinary =
      "00110000" +
      binaryFilterValue +
      this.padBinaryString((6).toString(2), 3) +
      binaryCompanyPrefix +
      binaryItemReference +
      binarySerialNumber;
    const epcHex = this.convertBinaryToHex(epcBinary).toUpperCase();

    return epcHex.padStart(24, "0");
  }

  private padBinaryString(binaryString: string, length: number): string {
    return binaryString.padStart(length, "0");
  }

  private convertBinaryToHex(binaryString: string): string {
    let hex = "";
    for (let i = 0; i < binaryString.length; i += 4) {
      const fourBitBinary = binaryString.substring(i, i + 4);
      hex += parseInt(fourBitBinary, 2).toString(16);
    }
    return hex;
  }
}
