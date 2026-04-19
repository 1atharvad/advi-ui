import React, { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
    { className, ...props }, ref) => (
  <div ref={ref} className={cn("vi-card", className)} {...props} />
))
Card.displayName = "Card"

const CardImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>((
    { className, src, alt, ...props }, ref) => (
  <img ref={ref} src={src} alt={alt} className={cn("vi-card-image", className)} {...props} />
))
CardImage.displayName = "CardImage"

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
    { className, ...props }, ref) => (
  <div ref={ref} className={cn("vi-card-title", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
    { className, ...props }, ref) => (
  <div ref={ref} className={cn("vi-card-description", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
    { className, ...props }, ref) => (
  <div ref={ref} className={cn("vi-card-content", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardWrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
    { className, ...props }, ref) => (
  <div ref={ref} className={cn("vi-card-wrapper", className)} {...props} />
))
CardWrapper.displayName = "CardWrapper"

export { Card, CardWrapper, CardImage, CardTitle, CardDescription, CardContent }
