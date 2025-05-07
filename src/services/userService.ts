import { UserProfile } from "../models/UserProfile";
import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { DefaultImage } from "../models/DefaultImage";
import { UserImage } from "../models/UserImage";
import { UserPreview } from "../models/UserPreview";
import { UserPage } from "../models/UserPage";

export const userService = {
  getProfile: async (token: string): Promise<UserProfile> => {
    const response = await fetch(`${BASE_API}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(errorMessages.userProfile);

    return response.json();
  },

  getFollowers: async (): Promise<UserPreview[]> => {
    const res = await fetch(`${BASE_API}/user/followers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) throw new Error("Error al obtener seguidores");
  
    return res.json();
  },
  
  getFollowing: async (): Promise<UserPreview[]> => {
    const res = await fetch(`${BASE_API}/user/following`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) throw new Error("Error al obtener seguidos");
  
    return res.json();
  },

  getUserPage: async (userId: number): Promise<UserPage> => {
    const res = await fetch(`${BASE_API}/user/${userId}/page`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("No se pudo cargar la página del usuario");
    }
  
    return res.json();
  },

  toggleFollow: async (userId: number): Promise<void> => {
    const res = await fetch(`${BASE_API}/user/${userId}/toggle-follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Error al intentar seguir/dejar de seguir");
    }
  },

  // services/userService.ts (añadir)
  uploadProfileImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_API}/user/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
      body: formData,
    });

    if (res.status === 413) {
      throw new Error("La imagen es demasiado grande (máx 2MB).");
    }

    if (!res.ok) throw new Error("Error al subir la imagen.");

    const data = await res.json();
    return data.profileImageUrl;
  },

  deleteProfileImage: async (): Promise<void> => {
    const res = await fetch(`${BASE_API}/user/profile-image`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (res.status === 403) {
      throw new Error("No autorizado para eliminar la imagen.");
    }
  
    if (!res.ok) {
      throw new Error("Error al eliminar la imagen.");
    }
  },

  getDefaultImages: async (): Promise<DefaultImage[]> => {
    const res = await fetch(`${BASE_API}/default-image`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Error al obtener imágenes predeterminadas.");
    }
  
    return res.json();
  },

  // services/userService.ts
  setDefaultProfileImage: async (imageUrl: string): Promise<void> => {
    const res = await fetch(`${BASE_API}/user/update-image-url`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
      body: JSON.stringify({ imageUrl }),
    });
  
    if (!res.ok) {
      throw new Error("Error al actualizar imagen de perfil predeterminada.");
    }
  },

  getUserImages: async (): Promise<UserImage[]> => {
    const res = await fetch(`${BASE_API}/image/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Error al obtener imágenes anteriores.");
    }
  
    return res.json();
  },  
};
