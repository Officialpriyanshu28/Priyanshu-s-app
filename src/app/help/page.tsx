
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Help & Support</CardTitle>
          <CardDescription>
            We're here to help. Contact us if you have any questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
               <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Support</h3>
              <p className="text-muted-foreground">
                For any inquiries, please email us. We'll get back to you within 24 hours.
              </p>
              <a href="mailto:support@priyanshusapp.com" className="font-medium text-primary hover:underline">
                support@priyanshusapp.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
               <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone Support</h3>
              <p className="text-muted-foreground">
                Our support team is available from 9 AM to 5 PM, Mon-Fri.
              </p>
              <a href="tel:+123456789" className="font-medium text-primary hover:underline">
                +1 (234) 567-89
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
