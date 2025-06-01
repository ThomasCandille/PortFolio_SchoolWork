"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-default-100 border-t border-default-200">
      <div className="container mx-auto px-6 text-center">
        <p className="text-default-600">
          © {currentYear} Students Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
