export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground mb-4">
            At Onlen Nursery, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Personal information (name, email address, shipping address)</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Device and browser information</li>
            <li>Usage data and preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your orders and our services</li>
            <li>To improve our website and services</li>
            <li>To send marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-muted-foreground mb-4">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@onlennursery.com
            <br />
            Phone: (555) 123-4567
          </p>
        </section>
      </div>
    </div>
  )
}