import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

interface Space {
  id: string
  name: string
  description: string
}

async function getSpaces(): Promise<Space[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spaces`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch spaces')
  }
  return res.json()
}

export default async function SpacePage() {
  const spaces = await getSpaces()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Spaces</h1>
        <Link href="/space/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Space
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id}>
            <CardHeader>
              <CardTitle>{space.name}</CardTitle>
              <CardDescription>{space.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 这里可以添加更多空间相关的信息 */}
            </CardContent>
            <CardFooter>
              <Link href={`/space/${space.id}`} className="w-full">
                <Button variant="outline" className="w-full">View Space</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
