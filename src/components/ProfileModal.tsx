import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { User, Mail, Calendar, LogOut, Settings } from "lucide-react";
import { useAuth } from "./FirebaseAuth";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onNavigateToProfile?: () => void; // optional navigation callback
}

export default function ProfileModal({
  open,
  onClose,
  onNavigateToProfile,
}: ProfileModalProps) {
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      onClose();
    }
  };

  const initials = (name?: string) =>
    (name || "U")
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl">
                {initials(user?.displayName || user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg truncate">
                {user?.displayName || "Anonymous"}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 truncate">
                {user?.email}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-xs text-gray-500">Account</div>
                <div className="text-sm">{user?.uid}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-sm truncate">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">Joined</div>
              <div className="text-sm">
                {user?.metadata?.creationTime ?? "—"}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => onNavigateToProfile?.() || onClose()}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage account
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
