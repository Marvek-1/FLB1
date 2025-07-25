import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shell } from "@/components/Shell"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const data = [
  {
    name: "Nwangi Thomas",
    email: "nwangi.thomas@med.ke",
    phone: "+254-701-123456",
    specialty: "Cardiologist",
    location: "Nairobi, Kenya",
    availability: "Mon-Fri",
    status: "Active",
  },
  {
    name: "Denis Moraa",
    email: "denis.moraa@clinic.ug",
    phone: "+256-772-456789",
    specialty: "Dermatologist",
    location: "Kampala, Uganda",
    availability: "Tue-Sat",
    status: "Inactive",
  },
  {
    name: "Alice Murekezi",
    email: "alice.murekezi@peds.rw",
    phone: "+250-788-987654",
    specialty: "Pediatrician",
    location: "Kigali, Rwanda",
    availability: "Wed-Sun",
    status: "Active",
  },
  {
    name: "Boubacar Williams",
    email: "boubacar.williams@med.sn",
    phone: "+221-773-112233",
    specialty: "Oncologist",
    location: "Dakar, Senegal",
    availability: "Mon-Sat",
    status: "Active",
  },
  {
    name: "Emelda Okonkwo",
    email: "emelda.okonkwo@neuro.ng",
    phone: "+234-809-445566",
    specialty: "Neurologist",
    location: "Enugu, Nigeria",
    availability: "Tue-Fri",
    status: "Inactive",
  },
  {
    name: "David Abebe",
    email: "david.abebe@surge.et",
    phone: "+251-911-778899",
    specialty: "Surgeon",
    location: "Addis Ababa, Ethiopia",
    availability: "Mon-Sun",
    status: "Active",
  },
  {
    name: "Linda Tshabalala",
    email: "linda.tshabalala@mental.za",
    phone: "+27-82-3344556",
    specialty: "Psychiatrist",
    location: "Johannesburg, South Africa",
    availability: "Wed-Sat",
    status: "Active",
  },
  {
    name: "Michael Kombo",
    email: "michael.kombo@eye.ke",
    phone: "+254-722-667788",
    specialty: "Ophthalmologist",
    location: "Mombasa, Kenya",
    availability: "Tue-Sun",
    status: "Inactive",
  },
  {
    name: "Baraka Ncube",
    email: "baraka.ncube@ent.zw",
    phone: "+263-773-554433",
    specialty: "ENT Specialist",
    location: "Harare, Zimbabwe",
    availability: "Mon-Fri",
    status: "Active",
  },
  {
    name: "James Okoro",
    email: "james.okoro@gastro.ng",
    phone: "+234-803-990011",
    specialty: "Gastroenterologist",
    location: "Lagos, Nigeria",
    availability: "Wed-Sun",
    status: "Active",
  },
]
export default function HealersPage() {
  return (
    <Shell>
      <div className="grid gap-6">
        <div className="flex items-center justify-between space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Our Healers</h2>
          <Link href="/register/healer">
            <Button className="bg-flame hover:bg-pulse text-white px-8 py-4 text-lg rounded-md transition-all hover:shadow-[0_0_20px_rgba(255,78,0,0.3)]">
              Register as a Healer
            </Button>
          </Link>
        </div>
        <Separator />
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Healer List</CardTitle>
              <CardDescription>All registered healers are listed here.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.specialty}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.availability}</TableCell>
                        <TableCell className="text-right">
                          {row.status === "Active" ? (
                            <Badge variant="outline">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  )
}
