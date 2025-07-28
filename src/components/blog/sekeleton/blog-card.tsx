import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeletonBesar() {
  return (
    <div className="flex flex-col md:flex-row gap-8 border-b-[3px] border-primary pb-8">
      <div className="w-full md:w-1/2 flex flex-col gap-4 group">
        <Skeleton className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden"></Skeleton>
        <div className="flex flex-col gap-1">
          <Skeleton className="" />
          <Skeleton className="h-5 w-[50%]" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4 group">
        <Skeleton className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden"></Skeleton>
        <div className="flex flex-col gap-1">
          <Skeleton className="" />
          <Skeleton className="h-5 w-[50%]" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeletonKecil() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="flex flex-col gap-4 group">
        <Skeleton className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[50%] h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-4 group">
        <Skeleton className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[50%] h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-4 group">
        <Skeleton className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[50%] h-4" />
        </div>
      </div>
    </section>
  );
}
