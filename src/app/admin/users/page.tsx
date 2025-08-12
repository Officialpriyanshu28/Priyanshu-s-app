
'use client';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialUsers = [
  {
    id: 'user-1',
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    joined: "2023-01-15",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026024d",
  },
  {
    id: 'user-2',
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Student",
    status: "Active",
    joined: "2023-02-20",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704d",
  },
   {
    id: 'user-3',
    name: "Bob Johnson",
    email: "bob.j@example.com",
    role: "Student",
    status: "Inactive",
    joined: "2023-03-10",
    avatar: "https://i.pravatar.cc/40?u=a042581f4e29026705d",
  },
];

type User = typeof initialUsers[0];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: string) => {
    // In a real app, this would be an API call
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast({
      title: "User Updated",
      description: `The user's role has been changed to ${newRole}.`,
    });
    setIsEditOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would be an API call
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
     <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users and their roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p>{user.name}</p>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <Dialog open={isEditOpen && selectedUser?.id === user.id} onOpenChange={(open) => { if (!open) setSelectedUser(null); setIsEditOpen(open); }}>
                       <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={() => setSelectedUser(user)}>
                                    Edit Role
                                  </DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuSeparator />
                               <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    Delete
                                </DropdownMenuItem>
                               </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DialogContent>
                              <DialogHeader>
                                  <DialogTitle>Edit User Role</DialogTitle>
                                  <DialogDescription>
                                      Change the role for {selectedUser?.name}.
                                  </DialogDescription>
                              </DialogHeader>
                               <div className="py-4">
                                <Label htmlFor="role" className="mb-2 block">Role</Label>
                                <Select defaultValue={selectedUser?.role} onValueChange={(newRole) => {
                                   if (selectedUser) {
                                     setSelectedUser({...selectedUser, role: newRole});
                                   }
                                }}>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Student">Student</SelectItem>
                                        <SelectItem value="Instructor">Instructor</SelectItem>
                                    </SelectContent>
                                </Select>
                               </div>
                              <DialogFooter>
                                  <DialogClose asChild>
                                     <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button onClick={() => handleRoleChange(selectedUser!.id, selectedUser!.role)}>Save Changes</Button>
                              </DialogFooter>
                          </DialogContent>
                          
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user account.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
