import { Users } from "lucide-react";
import { Link } from "react-router";
import { EmployeeForm } from "~/components/forms/EmployeeForm";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-6">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-4xl font-bold text-foreground mb-2">HRnet</h1>
						<p className="text-muted-foreground">Employee management system</p>
					</div>
					<Link to="/employee-list">
						<Button variant="outline" className="flex items-center gap-2">
							<Users className="h-4 w-4" />
							View Employees
						</Button>
					</Link>
				</div>
				<EmployeeForm />
			</div>
		</div>
	);
}
