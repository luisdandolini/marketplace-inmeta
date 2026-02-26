import { useTrades } from "../features/trades/hooks/useTrades";
import { TradeItem } from "../features/trades/components/TradeItem";
import { LoadingState } from "../shared/components/LoadingState";
import { EmptyState } from "../shared/components/EmptyState";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll";
import { ArrowRightLeft } from "lucide-react";
import { BackToTop } from "../shared/components/BackToTop";

export const TradesPage = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTrades();

  const loaderRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  const trades = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-text">Marketplace</h1>
        <p className="text-text-muted text-sm mt-1">Todas as trocas abertas</p>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando trocas..." />
      ) : trades.length === 0 ? (
        <EmptyState
          icon={<ArrowRightLeft size={32} />}
          title="Nenhuma troca encontrada"
          description="Seja o primeiro a criar uma troca!"
        />
      ) : (
        <div className="flex flex-col gap-4">
          {trades.map((trade) => (
            <TradeItem key={trade.id} trade={trade} />
          ))}
          <div ref={loaderRef} className="py-4">
            {isFetchingNextPage && (
              <LoadingState message="Carregando mais trocas..." />
            )}
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
};
