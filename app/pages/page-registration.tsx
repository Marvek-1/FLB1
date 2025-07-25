import { RegistrationLayout } from "@/components/registration/registration-layout"
import { HealerRegistrationForm } from "@/components/registration/healer-registration-form"

export default function HealerRegistrationPage() {
  return (
    <RegistrationLayout
      title="Register as a Healer"
      subtitle="Join the Flameborn community of verified healthcare workers"
      type="healer"
    >
      <HealerRegistrationForm />
    </RegistrationLayout>
  )
}
