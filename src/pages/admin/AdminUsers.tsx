import React, { useState } from "react";
import { 
  User, 
  Shield, 
  UserCog, 
  Trash2, 
  Filter, 
  UserPlus, 
  Download,
  Search,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// User interface
interface UserData {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'blogger' | 'user';
  status: 'active' | 'inactive';
  lastLogin?: string;
  avatar?: string;
}

// Mock user data
const mockUsers: UserData[] = [
  { 
    id: "1", 
    username: "admin", 
    email: "admin@example.com", 
    role: "admin", 
    status: "active",
    lastLogin: "2023-05-25 08:30"
  },
  { 
    id: "2", 
    username: "blogger1", 
    email: "blogger1@example.com", 
    role: "blogger", 
    status: "active",
    lastLogin: "2023-05-24 15:45"
  },
  { 
    id: "3", 
    username: "blogger2", 
    email: "blogger2@example.com", 
    role: "blogger", 
    status: "active",
    lastLogin: "2023-05-23 12:10"
  },
  { 
    id: "4", 
    username: "user1", 
    email: "user1@example.com", 
    role: "user", 
    status: "active",
    lastLogin: "2023-05-22 09:15"
  },
  { 
    id: "5", 
    username: "user2", 
    email: "user2@example.com", 
    role: "user", 
    status: "inactive",
    lastLogin: "2023-05-10 14:30"
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  // Form state for new user
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "user" as 'admin' | 'blogger' | 'user',
    sendInvite: true
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    // Role filter
    if (roleFilter !== "all" && user.role !== roleFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }
    
    // Search filter (case-insensitive in username or email)
    if (search && !user.username.toLowerCase().includes(search.toLowerCase()) && 
        !user.email.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleAddUser = () => {
    // Validate form
    if (!newUser.username || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new user object
    const newUserObj: UserData = {
      id: `${users.length + 1}`,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: "Never"
    };

    // Add user to list
    setUsers([...users, newUserObj]);
    
    // Reset form and close dialog
    setNewUser({
      username: "",
      email: "",
      role: "user" as 'admin' | 'blogger' | 'user',
      sendInvite: true
    });
    setDialogOpen(false);
    
    toast({
      title: "User added",
      description: `${newUser.username} has been added successfully${newUser.sendInvite ? " and an invitation has been sent" : ""}.`
    });
  };

  const handleUpdateRole = (id: string, newRole: 'admin' | 'blogger' | 'user') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${newRole}.`
    });
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
    
    const updatedUser = users.find(user => user.id === id);
    const newStatus = updatedUser?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Status updated",
      description: `User has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
    });
  };

  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User deleted",
      description: `${userToDelete?.username} has been removed from the system.`
    });
  };

  const exportUsers = () => {
    // In a real application, this would generate a CSV or Excel file
    toast({
      title: "Export initiated",
      description: "Your user data is being exported. The download will start shortly."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and their permissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportUsers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and assign a role.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    placeholder="Enter username" 
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value: 'admin' | 'blogger' | 'user') => 
                      setNewUser({...newUser, role: value})
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="blogger">Blogger</SelectItem>
                      <SelectItem value="user">Regular User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="send-invite" 
                    checked={newUser.sendInvite}
                    onCheckedChange={(checked) => 
                      setNewUser({...newUser, sendInvite: checked})
                    }
                  />
                  <Label htmlFor="send-invite">Send invitation email</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <Select 
            value={roleFilter} 
            onValueChange={(value: string) => setRoleFilter(value)}
          >
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
              <SelectItem value="blogger">Bloggers</SelectItem>
              <SelectItem value="user">Regular Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select 
            value={statusFilter} 
            onValueChange={(value: string) => setStatusFilter(value)}
          >
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground mb-4">
            {search || roleFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters."
              : "Add your first user to get started."}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and assign a role.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    placeholder="Enter username" 
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value: 'admin' | 'blogger' | 'user') => 
                      setNewUser({...newUser, role: value})
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="blogger">Blogger</SelectItem>
                      <SelectItem value="user">Regular User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="send-invite" 
                    checked={newUser.sendInvite}
                    onCheckedChange={(checked) => 
                      setNewUser({...newUser, sendInvite: checked})
                    }
                  />
                  <Label htmlFor="send-invite">Send invitation email</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Email</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Last Login</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.username} />
                        ) : (
                          <AvatarFallback>
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">{user.email}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' 
                        : user.role === 'blogger'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 
                       user.role === 'blogger' ? 'Blogger' : 'User'}
                    </span>
                  </td>
                  <td className="p-3 hidden md:table-cell">{user.lastLogin || "Never"}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem disabled={user.role === 'admin'} onClick={() => handleUpdateRole(user.id, 'admin')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={user.role === 'blogger'} onClick={() => handleUpdateRole(user.id, 'blogger')}>
                          <UserCog className="mr-2 h-4 w-4" />
                          Make Blogger
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={user.role === 'user'} onClick={() => handleUpdateRole(user.id, 'user')}>
                          <User className="mr-2 h-4 w-4" />
                          Set as Regular User
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                          {user.status === 'active' ? (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
