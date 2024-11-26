import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Step1 = ({ formData, onChange, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <form className="space-y-4">
      {[
        "username",
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmpassword",
      ].map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            id={field}
            name={field}
            type={field.includes("password") ? "password" : "text"}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <Button onClick={nextStep} className="w-full">
        Next
      </Button>
    </form>
  );
};

export default Step1;
