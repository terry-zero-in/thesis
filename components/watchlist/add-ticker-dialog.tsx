"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { addTicker } from "@/lib/watchlist/actions";

const Schema = z.object({
  symbol: z
    .string()
    .min(1, "Required")
    .max(10)
    .regex(/^[A-Za-z][A-Za-z0-9.\-]*$/, "Letters, digits, '.' or '-' only"),
  conviction: z.number().int().min(1).max(10),
});

type FormValues = z.infer<typeof Schema>;

export function AddTickerDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [conviction, setConviction] = useState(5);
  const [targetPrice, setTargetPrice] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { symbol: "", conviction: 5 },
  });

  const resetForm = () => {
    form.reset({ symbol: "", conviction: 5 });
    setConviction(5);
    setTargetPrice("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  const onSubmit = (values: FormValues) => {
    const trimmed = targetPrice.trim();
    const parsed = trimmed === "" ? null : Number(trimmed);
    if (parsed != null && (Number.isNaN(parsed) || parsed <= 0)) {
      toast.error("Target price must be a positive number.");
      return;
    }
    startTransition(async () => {
      const result = await addTicker({
        symbol: values.symbol,
        conviction: values.conviction,
        targetPrice: parsed,
      });
      if (result.ok) {
        toast.success(`${values.symbol.toUpperCase()} added`);
        resetForm();
        onOpenChange(false);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add ticker</DialogTitle>
          <DialogDescription>
            Symbol is validated before saving.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              placeholder="NVDA"
              className="font-mono uppercase tracking-wide"
              {...form.register("symbol", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                },
              })}
            />
            {form.formState.errors.symbol ? (
              <p className="text-xs text-danger">
                {form.formState.errors.symbol.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Conviction</Label>
              <span className="font-mono text-sm tnum text-text-2">
                {conviction}/10
              </span>
            </div>
            <Slider
              value={[conviction]}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) => {
                const next = Array.isArray(v) ? v[0] : v;
                setConviction(next);
                form.setValue("conviction", next, { shouldValidate: true });
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target price (optional)</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-text-3">
                $
              </span>
              <Input
                id="target"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-7 font-mono tnum"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding…" : "Add ticker"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
