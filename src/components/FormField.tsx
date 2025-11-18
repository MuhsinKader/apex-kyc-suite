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
    <div className={`space-y-2.5 ${className}`}>
      <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
        {label}
        {required && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-destructive/10 text-destructive text-xs font-bold">
            REQUIRED
          </span>
        )}
      </Label>
      <Input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-card border-2 border-border/80 hover:border-primary/60 hover:shadow-md focus:border-primary focus:ring-4 focus:ring-primary/20 focus:shadow-lg transition-all duration-200 h-12 text-base font-medium placeholder:text-muted-foreground/60 rounded-lg"
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
    <div className={`space-y-2.5 ${className}`}>
      <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
        {label}
        {required && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-destructive/10 text-destructive text-xs font-bold">
            REQUIRED
          </span>
        )}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-2 border-border/80 hover:border-primary/60 hover:shadow-md focus:border-primary focus:ring-4 focus:ring-primary/20 focus:shadow-lg transition-all duration-200 h-12 text-base font-medium rounded-lg">
          <SelectValue placeholder={placeholder} className="text-muted-foreground/60" />
        </SelectTrigger>
        <SelectContent className="bg-card border-2 border-border/80 shadow-elevated rounded-xl">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="hover:bg-primary/10 cursor-pointer font-medium rounded-lg my-1 focus:bg-primary/10"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
