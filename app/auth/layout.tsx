export default function LayoutAuth({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-gray-800">
            {children}
        </div>
    )
}