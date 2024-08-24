import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";

export default function ErrorCard() {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Upsss! Algo malo ocurrio :c" />
            </CardHeader>
            <CardFooter>
                <BackButton label="Volver al login" href="/auth/login" />
            </CardFooter>
        </Card>
    )
}