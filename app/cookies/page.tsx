export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us make your experience better by:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Remembering your preferences</li>
            <li>Keeping you signed in</li>
            <li>Understanding how you use our site</li>
            <li>Improving our services based on your behavior</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground">
                Required for the website to function properly. These cannot be disabled.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Functional Cookies</h3>
              <p className="text-muted-foreground">
                Remember your preferences and enhance your experience.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Analytics Cookies</h3>
              <p className="text-muted-foreground">
                Help us understand how visitors interact with our website.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Marketing Cookies</h3>
              <p className="text-muted-foreground">
                Track your activity across websites to deliver relevant advertisements.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="text-muted-foreground mb-4">
            You can control and/or delete cookies as you wish. You can:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Delete all cookies from your browser</li>
            <li>Set your browser to prevent cookies being placed</li>
            <li>Accept or decline cookies when prompted</li>
            <li>Manage cookie preferences through our cookie settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use services from these third parties that may place cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Google Analytics for website analytics</li>
            <li>Payment processors for secure transactions</li>
            <li>Social media platforms for sharing content</li>
            <li>Marketing services for personalized advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Cookie Policy from time to time. Please check back regularly to stay informed about our use of cookies.
            <br /><br />
            Last updated: April 2024
          </p>
        </section>
      </div>
    </div>
  )
}