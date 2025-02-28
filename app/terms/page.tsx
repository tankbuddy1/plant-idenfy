export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing or using Onlen Nursery's website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p className="text-muted-foreground mb-4">
            Permission is granted to temporarily access our website and services for personal, non-commercial use. This license does not include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Modifying or copying materials</li>
            <li>Using materials for commercial purposes</li>
            <li>Attempting to reverse engineer any software</li>
            <li>Removing any copyright or proprietary notations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
          <p className="text-muted-foreground mb-4">
            We strive to provide accurate product descriptions and pricing. However:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Products may vary slightly from their pictures</li>
            <li>Prices are subject to change without notice</li>
            <li>Availability is not guaranteed</li>
            <li>We reserve the right to limit quantities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping & Returns</h2>
          <p className="text-muted-foreground mb-4">
            Our shipping and returns policies include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Orders are typically processed within 1-2 business days</li>
            <li>Shipping times vary by location</li>
            <li>Returns must be initiated within 14 days</li>
            <li>Plants must be in original condition</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p className="text-muted-foreground mb-4">
            As a user, you are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Providing accurate account information</li>
            <li>Maintaining account security</li>
            <li>Following plant care instructions</li>
            <li>Complying with all applicable laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-muted-foreground mb-4">
            Our services are provided "as is." We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of intellectual property</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-muted-foreground">
            Questions about these Terms & Conditions should be sent to:
            <br />
            Email: legal@onlennursery.com
            <br />
            Phone: (555) 123-4567
          </p>
        </section>
      </div>
    </div>
  )
}