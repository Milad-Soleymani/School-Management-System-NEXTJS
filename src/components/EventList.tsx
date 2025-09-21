import prisma from "@/lib/prisma"

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
    // اگه پارامتر بود از اون استفاده کن، وگرنه امروز
    const date = dateParam ? new Date(dateParam) : new Date()

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const data = await prisma.event.findMany({
        where: {
            startTime: {
                gte: startOfDay,
                lte: endOfDay,
            }
        }
    })

    return data.map(event => (
        <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-blueSky even:border-t-specialPurple shadow-sm"
        >
            <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  {event.startTime.toLocaleTimeString('fa-IR', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                <h2 className="font-semibold text-gray-600">{event.title}</h2>
            </div>
            <p className="mt-2 text-gray-500 text-sm text-right">{event.description}</p>
        </div>
    ))
}

export default EventList
