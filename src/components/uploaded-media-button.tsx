"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Trash2, X } from "lucide-react";
import { deleteFromS3 } from "@/lib/s3-upload";
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
} from "./ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type UploadedMediaButtonProps = {
  savedMedia: {
    preview: string;
    type: string;
  }[];
  onDelete?: (url: string) => void;
};

const FullscreenViewer = ({
  media,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: {
  media: UploadedMediaButtonProps["savedMedia"];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [onClose, onNext, onPrevious]);

  const currentMedia = media[currentIndex];

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
      }}
      onClick={onClose}
    >
      {/* Navigation Buttons Container - Positioned above content */}
      <div
        className="pointer-events-none fixed inset-0 z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Arrow */}
        <div className="pointer-events-auto absolute top-1/2 left-4 -translate-y-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="rounded-full border border-white/20 bg-black/50 p-3 transition-colors hover:border-[1.5px] hover:border-white hover:bg-black/70"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
        </div>

        {/* Right Arrow */}
        <div className="pointer-events-auto absolute top-1/2 right-4 -translate-y-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="rounded-full border border-white/20 bg-black/50 p-3 transition-colors hover:border-[1.5px] hover:border-white hover:bg-black/70"
          >
            <ArrowRight size={24} className="text-white" />
          </button>
        </div>

        {/* Close Button */}
        <div className="pointer-events-auto absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded-full border border-white/20 bg-black/50 p-2 transition-colors hover:border-[1.5px] hover:border-white hover:bg-black/70"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center"
        style={{ width: "95vw", height: "95vh" }}
      >
        {currentMedia && (
          <div className="flex h-full w-full items-center justify-center">
            {currentMedia.type === "image" ? (
              <Image
                src={currentMedia.preview}
                alt={`Media ${currentIndex + 1}`}
                className="h-auto w-auto object-contain transition-transform duration-300"
                width={1920}
                height={1080}
                style={{
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                }}
              />
            ) : currentMedia.type === "video" ? (
              <video
                src={currentMedia.preview}
                className="h-auto w-auto object-contain"
                style={{
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                }}
                controls
                autoPlay
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

const MediaGrid = ({
  savedMedia,
  onDelete,
}: {
  savedMedia: UploadedMediaButtonProps["savedMedia"];
  onDelete: (url: string) => Promise<void>;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMediaClick = (index: number) => {
    if (isMobile) return;
    const media = savedMedia[index];
    if (media?.type === "audio") return;
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === savedMedia.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? savedMedia.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4">
        {savedMedia.map((media, index) => {
          if (media.type === "image") {
            return (
              <div key={index} className="group relative">
                <div
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleMediaClick(index)}
                >
                  <Image
                    src={media.preview}
                    alt={`Preview ${index}`}
                    className="aspect-square rounded-md object-cover"
                    width={200}
                    height={200}
                  />
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 transition-colors hover:bg-black/70">
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Media</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this media? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(media.preview)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          } else if (media.type === "video") {
            return (
              <div key={index} className="group relative">
                <div
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleMediaClick(index)}
                >
                  <video
                    src={media.preview}
                    className="aspect-square rounded-md object-cover"
                  />
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 transition-colors hover:bg-black/70">
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Media</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this media? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(media.preview)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          } else if (media.type === "audio") {
            return (
              <div
                key={index}
                className="relative flex aspect-square items-center justify-center rounded-md bg-gray-200"
              >
                🎵
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 transition-colors hover:bg-black/70">
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Media</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this media? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(media.preview)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          }
          return null;
        })}
      </div>

      {isFullscreen && !isMobile && (
        <FullscreenViewer
          media={savedMedia}
          currentIndex={currentIndex}
          onClose={() => setIsFullscreen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export function UploadedMediaButton({
  savedMedia: initialSavedMedia,
  onDelete,
}: UploadedMediaButtonProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [savedMedia, setSavedMedia] = useState(initialSavedMedia);
  const { toast } = useToast();

  useEffect(() => {
    setSavedMedia(initialSavedMedia);
  }, [initialSavedMedia]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDelete = async (url: string) => {
    const result = await deleteFromS3(url);
    if (result.success) {
      setSavedMedia((prev) => prev.filter((item) => item.preview !== url));
      onDelete?.(url);
      toast({
        title: "Media Deleted",
        description: "The media was successfully deleted.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete media. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ModalContent = () => (
    <ScrollArea className="w-full pb-5">
      <MediaGrid savedMedia={savedMedia} onDelete={handleDelete} />
    </ScrollArea>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="text-black">
            View Saved Media ({savedMedia.length})
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DialogTitle>Saved Media</DialogTitle>
          <ModalContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          View Saved Media ({savedMedia.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Saved Media</DialogTitle>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
}
