import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FormField = ({ 
  label, 
  required = false, 
  type = "text",
  placeholder,
  value,
  onChange,
  className = ""
}: FormFieldProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm xl:text-base font-bold text-foreground flex items-center gap-2.5">
        {label}
        {required && (
          <span className="text-[10px] xl:text-xs font-black px-2.5 py-1 bg-gradient-to-r from-destructive/15 to-destructive/10 text-destructive rounded-lg border border-destructive/30 uppercase tracking-wider shadow-sm">
            Required
          </span>
        )}
      </Label>
      <Input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-14 xl:h-16 2xl:h-18 text-base xl:text-lg border-2 border-border/70 bg-card/80 backdrop-blur-sm shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus:border-primary focus:shadow-[0_0_0_4px_rgba(33,96,253,0.12)] focus:bg-card hover:border-border hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-300"
      />
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  required?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SelectField = ({ 
  label, 
  required = false,
  placeholder,
  options,
  value,
  onChange,
  className = ""
}: SelectFieldProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm xl:text-base font-bold text-foreground flex items-center gap-2.5">
        {label}
        {required && (
          <span className="text-[10px] xl:text-xs font-black px-2.5 py-1 bg-gradient-to-r from-destructive/15 to-destructive/10 text-destructive rounded-lg border border-destructive/30 uppercase tracking-wider shadow-sm">
            Required
          </span>
        )}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-14 xl:h-16 2xl:h-18 text-base xl:text-lg border-2 border-border/70 bg-card/80 backdrop-blur-sm shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:border-border hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] focus:border-primary focus:shadow-[0_0_0_4px_rgba(33,96,253,0.12)] focus:bg-card transition-all duration-300">
          <SelectValue placeholder={placeholder} className="text-muted-foreground/60" />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-xl bg-card/95 border-border/60 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="focus:bg-primary/10 focus:text-primary cursor-pointer font-medium rounded-lg my-1 text-base xl:text-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
