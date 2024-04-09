import { prisma } from "../src/lib/prisma";
  
async function seed(){
  await prisma.event.create({
    data: {
      id: "5c08a27d-b897-4da7-b0ad-5545c115bacf",
      title: "Nlw Unite Secret",
      details: "Evento para quem está comprometido com a programação",
      slug: "nlw-unite-secret",
      maximumAttendees: 120
    }
  })
} 

seed().then(() => {
  console.log("Database seeded!")
  prisma.$disconnect()
})