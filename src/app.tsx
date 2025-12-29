import { useState } from "react";

// Configuración
import { IDCardConfigScreen } from "./features/settings/screens/IDCardConfigScreen";
import { NotificationsConfigScreen } from "./features/settings/screens/NotificationsConfigScreen";

// Usuarios
import { UsersListScreen } from "./features/users/screens/UsersListScreen";
import { UserDetailScreen } from "./features/users/screens/UserDetailScreen";
import { UserFormScreen } from "./features/users/screens/UserFormScreen";
import type { User } from './features/users/types/user.types';

// Places
import { SafeZonesScreen } from './features/places/screens/SafeZonesScreen';
import { CriticalPointsScreen } from './features/places/screens/CriticalPointsScreen';
import { FavoritePlacesScreen } from './features/places/screens/FavoritePlacesScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "users" | "user-detail" | "user-form" | "id-card" | "notifications" | "safe-zones" | "critical-points" | "favorite-places"
  >("users");

  // Usuarios
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 flex flex-col items-center gap-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-b-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-white text-primary-700 rounded-full font-bold text-lg">OB</div>
          <h1 className="text-lg font-bold">OpenBlind Admin</h1>
          <p className="text-sm text-white/80">Panel Administrativo</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <SidebarButton active={currentScreen === "users"} onClick={() => setCurrentScreen("users")}>👥 Usuarios</SidebarButton>
          <SidebarButton active={currentScreen === "safe-zones"} onClick={() => setCurrentScreen("safe-zones")}>🛡️ Zonas Seguras</SidebarButton>
          <SidebarButton active={currentScreen === "critical-points"} onClick={() => setCurrentScreen("critical-points")}>⚠️ Puntos Críticos</SidebarButton>
          <SidebarButton active={currentScreen === "favorite-places"} onClick={() => setCurrentScreen("favorite-places")}>⭐ Lugares Favoritos</SidebarButton>
          <SidebarButton active={currentScreen === "id-card"} onClick={() => setCurrentScreen("id-card")}>🪪 Tarjeta ID</SidebarButton>
          <SidebarButton active={currentScreen === "notifications"} onClick={() => setCurrentScreen("notifications")}>🔔 Notificaciones</SidebarButton>
        </nav>

        <div className="p-4 border-t border-neutral-200 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">RV</div>
          <span className="text-sm font-medium text-neutral-700">Ronny Villa</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-neutral-600">
          Inicio / Administración /{" "}
          <span className="text-neutral-900 font-medium">
            {currentScreen === "users" && "Gestión de Usuarios"}
            {currentScreen === "user-detail" && "Detalle de Usuario"}
            {currentScreen === "user-form" && (editingUser ? "Editar Usuario" : "Crear Usuario")}
            {currentScreen === "safe-zones" && "Zonas Seguras"}
            {currentScreen === "critical-points" && "Puntos Críticos"}
            {currentScreen === "favorite-places" && "Lugares Favoritos"}
            {currentScreen === "id-card" && "Tarjeta de Identificación"}
            {currentScreen === "notifications" && "Notificaciones"}
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {currentScreen === "users" && (
            <UsersListScreen
              onSelectUser={(user: User) => { setSelectedUser(user); setCurrentScreen("user-detail"); }}
              onCreate={() => { setEditingUser(null); setCurrentScreen("user-form"); }}
              onEdit={(user: User) => { setEditingUser(user); setCurrentScreen("user-form"); }}
            />
          )}

          {currentScreen === "user-form" && (
            <UserFormScreen
              user={editingUser}
              onCancel={() => setCurrentScreen("users")}
              onSave={() => setCurrentScreen("users")}
            />
          )}

          {currentScreen === "user-detail" && selectedUser && (
            <UserDetailScreen
              user={selectedUser}
              onBack={() => setCurrentScreen("users")}
            />
          )}

          {currentScreen === "safe-zones" && <SafeZonesScreen />}
          {currentScreen === "critical-points" && <CriticalPointsScreen />}
          {currentScreen === "favorite-places" && <FavoritePlacesScreen />}
          {currentScreen === "id-card" && <IDCardConfigScreen />}
          {currentScreen === "notifications" && <NotificationsConfigScreen />}
        </div>
      </main>
    </div>
  );
}

export default App;

// Sidebar Button Component
const SidebarButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${active ? "bg-primary-500 text-white shadow-md" : "text-neutral-700 hover:bg-primary-100"}`}
  >
    {children}
  </button>
);