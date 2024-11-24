"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from '@nextui-org/react';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { MusicData } from '@/types/music';

interface InputFileProps {
  onUploadComplete: (url: string) => void;
  disabled: boolean;
}

export function InputFile({ onUploadComplete, disabled }: InputFileProps) {
  const [uploading, setUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      if (!file.type.startsWith('audio/')) {
        toast.error('Por favor, selecione um arquivo de áudio');
        return;
      }

      if (file.size > 30 * 1024 * 1024) {
        toast.error('O arquivo é muito grande. Máximo de 30MB');
        return;
      }

      const res = await edgestore.musicUploader.upload({
        file,
      });

      onUploadComplete(res.url);
      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao enviar arquivo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
        id="music-upload"
        disabled={disabled || uploading}
      />
      <label htmlFor="music-upload">
        <Button
          as="span"
          color="primary"
          isLoading={uploading}
          className="cursor-pointer"
          isDisabled={disabled}
        >
          {uploading ? 'Enviando...' : 'Selecionar Música'}
        </Button>
      </label>
    </div>
  );
}
