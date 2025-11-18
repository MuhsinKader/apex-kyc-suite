import { useState } from "react";
import { KYCHeader } from "@/components/KYCHeader";
import { FormSection } from "@/components/FormSection";
import { FormField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, FileText, Building, User, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [activeTab, setActiveTab] = useState("client-info");

  return (
    <div className="min-h-screen bg-background">
      <KYCHeader />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Client Enquiry System</h2>
          <p className="text-muted-foreground">Secure KYC verification and identity management platform</p>
        </div>

        <Alert className="mb-6 border-accent-vibrant/20 bg-accent-vibrant/5">
          <AlertCircle className="h-4 w-4 text-accent-vibrant" />
          <AlertDescription className="text-sm text-foreground">
            <strong>Permissible Purpose:</strong> Internal Use Only - All enquiries are logged and monitored for compliance.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="client-info" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <User className="h-4 w-4 mr-2" />
              Client Information
            </TabsTrigger>
            <TabsTrigger 
              value="verification" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              Identity Verification
            </TabsTrigger>
            <TabsTrigger 
              value="company" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <Building className="h-4 w-4 mr-2" />
              Company Verification
            </TabsTrigger>
            <TabsTrigger 
              value="enquiries" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              My Enquiries
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
            >
              About KYC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client-info" className="space-y-6 animate-fade-in">
            <Card className="shadow-[var(--shadow-card)] border-border">
              <CardContent className="pt-6">
                <FormSection title="Template Selection">
                  <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                      label="Legacy Template"
                      placeholder="---PLEASE SELECT---"
                      options={[
                        { value: "template1", label: "Standard KYC Template" },
                        { value: "template2", label: "Enhanced Due Diligence" },
                        { value: "template3", label: "Corporate KYC" }
                      ]}
                    />
                    <SelectField
                      label="New KYC Template"
                      placeholder="---PLEASE SELECT---"
                      options={[
                        { value: "new1", label: "Individual Identity Verification" },
                        { value: "new2", label: "Business Entity Verification" },
                        { value: "new3", label: "International Client KYC" }
                      ]}
                    />
                  </div>
                </FormSection>

                <FormSection title="Version & Reference" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <SelectField
                      label="Version"
                      required
                      placeholder="Select version"
                      options={[
                        { value: "v1", label: "Version 1" },
                        { value: "v2", label: "Version 2" },
                        { value: "v3", label: "Version 3" }
                      ]}
                    />
                    <FormField
                      label="Reference Number"
                      required
                      placeholder="Enter reference number"
                    />
                    <FormField
                      label="ID Number"
                      required
                      placeholder="Enter ID number"
                    />
                  </div>
                </FormSection>

                <FormSection title="Person Details" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      label="Surname"
                      required
                      placeholder="Enter surname"
                    />
                    <FormField
                      label="First Name"
                      required
                      placeholder="Enter first name"
                    />
                    <FormField
                      label="Second Name"
                      placeholder="Enter second name (optional)"
                      className="md:col-span-2"
                    />
                  </div>
                </FormSection>

                <FormSection title="Address Details" className="mt-6">
                  <div className="grid gap-4">
                    <FormField
                      label="Address Line 1"
                      placeholder="Enter street address"
                    />
                    <FormField
                      label="Address Line 2"
                      placeholder="Enter additional address information"
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        label="Address Line 3"
                        placeholder="City/Town"
                      />
                      <FormField
                        label="Address Line 4"
                        placeholder="State/Province"
                      />
                    </div>
                    <FormField
                      label="Postal Code"
                      placeholder="Enter postal code"
                      className="md:w-1/2"
                    />
                  </div>
                </FormSection>

                <FormSection title="Contact Details" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      label="Telephone Number"
                      type="tel"
                      placeholder="Enter telephone number"
                    />
                    <FormField
                      label="Email Address"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                </FormSection>

                <FormSection title="Employer Details" className="mt-6">
                  <FormField
                    label="Employer Name"
                    placeholder="Enter employer name"
                  />
                </FormSection>

                <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Do Enquiry
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-border hover:bg-muted"
                  >
                    Reset Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="animate-fade-in">
            <Card className="shadow-[var(--shadow-card)] border-border">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Identity Verification</h3>
                  <p className="text-muted-foreground">Select a client from the information tab to proceed with verification</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="animate-fade-in">
            <Card className="shadow-[var(--shadow-card)] border-border">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Building className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Company Verification</h3>
                  <p className="text-muted-foreground">Corporate KYC and business entity verification tools</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enquiries" className="animate-fade-in">
            <Card className="shadow-[var(--shadow-card)] border-border">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">My Previous Enquiries</h3>
                  <p className="text-muted-foreground">View and manage your enquiry history</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="animate-fade-in">
            <Card className="shadow-[var(--shadow-card)] border-border">
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-xl font-semibold text-foreground mb-4">About KYC System</h3>
                  <p className="text-muted-foreground mb-4">
                    The Consumer Profile Bureau KYC system is a secure, enterprise-grade platform for customer identity verification and due diligence.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ Real-time identity verification</li>
                    <li>✓ Comprehensive data security and encryption</li>
                    <li>✓ Regulatory compliance monitoring</li>
                    <li>✓ Advanced fraud detection</li>
                    <li>✓ Audit trail and reporting</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border bg-card mt-16 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Consumer Profile Bureau. All rights reserved. | Secured by enterprise-grade encryption</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
