import spinner from '@/public/spinner.gif'
import Image from 'next/image'

type props = {
    className?: string
}

export default function Loading({ className }: props) {
    const styling = (style?: string): string => {
        if (style) {
            return style
        } else {
            return 'flex flex-1 transform -translate-y-20 items-center justify-center'
        }
    }

    return (
        <div className={styling(className)}>
            <Image src={spinner} width={64} height={64} unoptimized alt="loading spinner gif" />
        </div>
    )
}