import { isLocalMode } from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { GeneraDocs } from "@/components/env-manager/genera-docs";

export default function LocalEnvManagerPage() {

  return <GeneraDocs />
}