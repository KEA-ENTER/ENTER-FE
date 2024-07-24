import Title from "../basic/Title";
import Penalty from "./Penalty";

export default function RentReport() {
    return(
        <div>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <Penalty />
        </div>
    );
}