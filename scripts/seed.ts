import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seedUserId = "11111111-1111-1111-1111-111111111111";

  const brand = await prisma.brand.upsert({
    where: { name: "Volkswagen" },
    update: {},
    create: {
      name: "Volkswagen",
      country: "Deutschland"
    }
  });

  const model = await prisma.model.upsert({
    where: {
      brandId_name_generation: {
        brandId: brand.id,
        name: "Golf",
        generation: "VII"
      }
    },
    update: {
      summaryMd:
        "Der Golf VII ist bekannt für seine ausgewogene Mischung aus Komfort und Effizienz. Dennoch berichten Fahrer:innen von vereinzelten Problemen mit der Steuerkette und fehlerhaften Softwareupdates.",
      yearsFrom: 2012,
      yearsTo: 2019
    },
    create: {
      brandId: brand.id,
      name: "Golf",
      generation: "VII",
      summaryMd:
        "Der Golf VII ist bekannt für seine ausgewogene Mischung aus Komfort und Effizienz. Dennoch berichten Fahrer:innen von vereinzelten Problemen mit der Steuerkette und fehlerhaften Softwareupdates.",
      yearsFrom: 2012,
      yearsTo: 2019
    }
  });

  await prisma.issue.upsert({
    where: { id: "issue-seed-1" },
    update: {
      title: "Steuerkette verursacht Geräusche",
      description:
        "Bei kaltem Motor klappernde Geräusche aus dem Motorraum. Betroffene berichten, dass ein Wechsel der Steuerkette notwendig wurde.",
      severity: 3,
      modelId: model.id
    },
    create: {
      id: "issue-seed-1",
      modelId: model.id,
      title: "Steuerkette verursacht Geräusche",
      description:
        "Bei kaltem Motor klappernde Geräusche aus dem Motorraum. Betroffene berichten, dass ein Wechsel der Steuerkette notwendig wurde.",
      severity: 3
    }
  });

  await prisma.issue.upsert({
    where: { id: "issue-seed-2" },
    update: {
      title: "Infotainment-Software hängt",
      description:
        "Das Discover Pro friert ein oder startet neu. Ein Softwareupdate behebt das Problem nur temporär.",
      severity: 2,
      modelId: model.id
    },
    create: {
      id: "issue-seed-2",
      modelId: model.id,
      title: "Infotainment-Software hängt",
      description:
        "Das Discover Pro friert ein oder startet neu. Ein Softwareupdate behebt das Problem nur temporär.",
      severity: 2
    }
  });

  await prisma.recall.upsert({
    where: { id: "recall-seed-1" },
    update: {
      modelId: model.id,
      code: "VW-19S7",
      title: "Airbag-Steuergerät Update",
      summary: "Softwareupdate am Airbag-Steuergerät zur Vermeidung fehlerhafter Auslösungen.",
      link: "https://www.vw.com",
      startDate: new Date("2018-02-01")
    },
    create: {
      id: "recall-seed-1",
      modelId: model.id,
      code: "VW-19S7",
      title: "Airbag-Steuergerät Update",
      summary: "Softwareupdate am Airbag-Steuergerät zur Vermeidung fehlerhafter Auslösungen.",
      link: "https://www.vw.com",
      startDate: new Date("2018-02-01")
    }
  });

  await prisma.communityReport.upsert({
    where: { id: "report-seed-1" },
    update: {
      modelId: model.id,
      userId: seedUserId,
      mileage: 86500,
      engineCode: "CXBA",
      description:
        "Bei 85tkm trat ein rasselndes Geräusch beim Starten auf. Werkstatt empfiehlt präventiven Tausch der Steuerkette, Kosten ca. 1200€. Nach Wechsel Ruhe.",
      proofUrl: "https://werkstatt.example.com/rechnung",
      occurredAt: new Date("2023-11-10")
    },
    create: {
      id: "report-seed-1",
      modelId: model.id,
      userId: seedUserId,
      mileage: 86500,
      engineCode: "CXBA",
      description:
        "Bei 85tkm trat ein rasselndes Geräusch beim Starten auf. Werkstatt empfiehlt präventiven Tausch der Steuerkette, Kosten ca. 1200€. Nach Wechsel Ruhe.",
      proofUrl: "https://werkstatt.example.com/rechnung",
      occurredAt: new Date("2023-11-10")
    }
  });

  console.log("Seed data successfully inserted.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
