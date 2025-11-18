import { useState } from "react";
import { KYCHeader } from "@/components/KYCHeader";
import { FormSection } from "@/components/FormSection";
import { FormField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [activeTab, setActiveTab] = useState("client");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-background">
      <KYCHeader />
      
      <main className="flex-1 container mx-auto px-8 py-12">
        <Card className="max-w-7xl mx-auto shadow-[0_24px_80px_rgba(15,23,42,0.12)] border border-border/50 bg-card/95 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-gradient-to-r from-card via-muted/30 to-card pb-8 pt-10">
            <CardTitle className="text-4xl font-bold text-foreground tracking-tight">Client Enquiry System</CardTitle>
            <CardDescription className="text-base text-muted-foreground font-semibold mt-2">
              KYC Verification and Client Information Management
            </CardDescription>
          </CardHeader>

          <CardContent className="p-10">
            <Alert className="mb-10 border-2 border-accent/40 bg-gradient-to-r from-accent/15 via-accent/10 to-accent/5 shadow-lg rounded-2xl backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 text-accent" />
              <AlertDescription className="text-sm text-foreground font-bold">
                <strong className="font-black">Permissible Purpose:</strong> Internal Use Only - All enquiries are logged and monitored for compliance.
              </AlertDescription>
            </Alert>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-10 gap-3 bg-muted/40 p-2 rounded-2xl border border-border/30 shadow-inner">
                <TabsTrigger value="client" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_4px_16px_rgba(33,96,253,0.3)] font-bold rounded-xl transition-all duration-300">
                  Client Info
                </TabsTrigger>
                <TabsTrigger value="verification" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_4px_16px_rgba(33,96,253,0.3)] font-bold rounded-xl transition-all duration-300">
                  Verification
                </TabsTrigger>
                <TabsTrigger value="company" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_4px_16px_rgba(33,96,253,0.3)] font-bold rounded-xl transition-all duration-300">
                  Company
                </TabsTrigger>
                <TabsTrigger value="enquiries" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_4px_16px_rgba(33,96,253,0.3)] font-bold rounded-xl transition-all duration-300">
                  My Enquiries
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_4px_16px_rgba(33,96,253,0.3)] font-bold rounded-xl transition-all duration-300">
                  About KYC
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-8">
                <FormSection title="Template Selection">
                  <div className="grid gap-6 md:grid-cols-2">
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
                        { value: "new1", label: "Digital Identity Verification" },
                        { value: "new2", label: "Biometric KYC" },
                        { value: "new3", label: "Fast Track KYC" }
                      ]}
                    />
                  </div>
                </FormSection>

                <FormSection title="Version and Reference">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      label="Version"
                      required
                      placeholder="Enter version number"
                    />
                    <FormField
                      label="Your Reference"
                      required
                      placeholder="Enter your reference"
                    />
                  </div>
                </FormSection>

                <FormSection title="Person Details">
                  <div className="grid gap-6 md:grid-cols-3">
                    <SelectField
                      label="Title"
                      required
                      placeholder="Select title"
                      options={[
                        { value: "mr", label: "Mr" },
                        { value: "mrs", label: "Mrs" },
                        { value: "ms", label: "Ms" },
                        { value: "dr", label: "Dr" },
                        { value: "prof", label: "Prof" }
                      ]}
                    />
                    <FormField
                      label="First Name"
                      required
                      placeholder="Enter first name"
                    />
                    <FormField
                      label="Surname"
                      required
                      placeholder="Enter surname"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      label="ID / Passport Number"
                      required
                      placeholder="Enter ID or passport number"
                    />
                    <FormField
                      label="Date of Birth"
                      required
                      type="date"
                    />
                  </div>
                </FormSection>

                <FormSection title="Address Details">
                  <div className="space-y-6">
                    <FormField
                      label="Address Line 1 (Unit Number / Complex / Building / Flat Name / Estate)"
                      required
                      placeholder="Enter unit, complex, building, flat name, or estate"
                    />
                    <FormField
                      label="Address Line 2 (Street Number and Street Name)"
                      required
                      placeholder="Enter street number and street name"
                    />
                    <FormField
                      label="Address Line 3 (Suburb)"
                      required
                      placeholder="Enter suburb"
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        label="Address Line 4 (Town)"
                        placeholder="Enter town"
                      />
                      <FormField
                        label="Address Line 5 (City)"
                        required
                        placeholder="Enter city"
                      />
                    </div>
                    <FormField
                      label="Postal Code"
                      required
                      placeholder="Enter postal code"
                    />
                  </div>
                </FormSection>

                <FormSection title="Contact Details">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      label="Cell Phone Number"
                      required
                      type="tel"
                      placeholder="Enter cell phone number"
                    />
                    <FormField
                      label="Email Address"
                      required
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <FormField
                    label="Work Phone Number"
                    type="tel"
                    placeholder="Enter work phone number"
                  />
                </FormSection>

                <FormSection title="Employer Details">
                  <div className="space-y-6">
                    <FormField
                      label="Employer Name"
                      placeholder="Enter employer name"
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        label="Occupation"
                        placeholder="Enter occupation"
                      />
                      <FormField
                        label="Industry"
                        placeholder="Enter industry"
                      />
                    </div>
                  </div>
                </FormSection>

                <div className="flex gap-5 justify-end pt-8">
                  <Button type="button" variant="outline" className="px-10 h-14 font-bold text-base border-2 hover:bg-muted hover:border-border transition-all duration-300">
                    Reset Form
                  </Button>
                  <Button type="submit" className="px-10 h-14 font-bold text-base bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-[0_8px_32px_rgba(33,96,253,0.4)] hover:scale-[1.02] transition-all duration-300">
                    Submit Enquiry
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verification" className="space-y-8">
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <CardContent className="pt-10 pb-10">
                    <div className="text-center py-16">
                      <h3 className="text-2xl font-bold text-foreground mb-3">Identity Verification</h3>
                      <p className="text-muted-foreground font-semibold">Upload and verify identity documents</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="space-y-8">
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <CardContent className="pt-10 pb-10">
                    <div className="text-center py-16">
                      <h3 className="text-2xl font-bold text-foreground mb-3">Company Verification</h3>
                      <p className="text-muted-foreground font-semibold">Verify company registration and details</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enquiries" className="space-y-8">
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <CardContent className="pt-10 pb-10">
                    <div className="text-center py-16">
                      <h3 className="text-2xl font-bold text-foreground mb-3">My Enquiries</h3>
                      <p className="text-muted-foreground font-semibold">View your previous enquiry history</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about" className="space-y-8">
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <CardContent className="pt-10 pb-10 space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">About KYC System</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                      Our KYC (Know Your Customer) system provides comprehensive identity verification and compliance management. 
                      This platform enables secure collection, verification, and management of customer information in accordance 
                      with regulatory requirements.
                    </p>
                    <div className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-bold text-foreground mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground font-medium">
                          <li>Secure identity verification</li>
                          <li>Compliance management</li>
                          <li>Document verification</li>
                          <li>Audit trail and reporting</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
