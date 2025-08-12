
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { users as initialUsers, type User } from "@/lib/data";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as User['role'] } : u));
    toast({
      title: "User Updated",
      description: `The user's role has been changed to ${newRole}.`,
    });
    setIsEditOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
      variant: "destructive",
    });
    setIsDeleteAlertOpen(false);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteAlertOpen(true);
  };

  return (
     <>
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
                        <AvatarImage src={user.avatar} alt={user.name} />
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => openEditDialog(user)}>
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem onSelect={() => openDeleteDialog(user)} className="text-destructive">
                                Delete
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="role" className="mb-2 block">Role</Label>
            <Select 
              defaultValue={selectedUser?.role} 
              onValueChange={(newRole) => {
                if (selectedUser) {
                  handleRoleChange(selectedUser.id, newRole)
                }
              }}
            >
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
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account for {selectedUser?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (selectedUser) {
                  handleDeleteUser(selectedUser.id)
                }
              }} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     </>
  );
}
