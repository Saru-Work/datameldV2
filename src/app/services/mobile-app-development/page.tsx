import ServicePageView, { serviceMetadata } from "@/components/ServicePage";
import { getServicePage } from "@/lib/services";

const service = getServicePage("mobile-app-development");

export const metadata = serviceMetadata(service);

export default function Page() {
  return <ServicePageView s={service} />;
}
