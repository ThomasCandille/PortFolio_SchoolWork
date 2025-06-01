import LoginForm from "./_layout/login-form";

export default function LoginPage({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-background">
                <LoginForm />
                {children}
        </main>
    );
}