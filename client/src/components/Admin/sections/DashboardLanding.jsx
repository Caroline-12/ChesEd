import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DashboardLanding() {
  return (
    <div>
      <section className="bg-background rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notification Center</h2>
          <Button variant="outline">Mark All as Read</Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    New Assignment Feedback
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 hours ago
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Your SQL Optimization assignment has been graded. Check your
                transcript for the feedback.
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    Assignment Status Update
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Your CSS Styling assignment has been marked as "In Progress" by
                your tutor.
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    New Message from Tutor
                  </div>
                  <div className="text-xs text-muted-foreground">
                    3 days ago
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Your tutor, John Smith, has sent you a message regarding your
                JavaScript Project. Please check your assignments.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
