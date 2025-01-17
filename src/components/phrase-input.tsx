import { Input } from "@/components/ui/input";
import { TypographyP } from "@/components/ui/Typography";

interface PhraseInputProps {
    index: number,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean
}

const PhraseInput = ({ index, value, onChange, disabled = false }: PhraseInputProps) => {
    return (
        <div className="flex items-end">
            <TypographyP className="pr-1">{index}.</TypographyP>
            <Input type="text" value={value} disabled={disabled} onChange={onChange} />
        </div>
    )
}

export default PhraseInput;