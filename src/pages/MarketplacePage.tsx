import { useTrades } from "../features/trades/hooks/useTrades";
import { TradeItem } from "../features/trades/components/TradeItem";
import { LoadingState } from "../shared/components/LoadingState";
import { EmptyState } from "../shared/components/EmptyState";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll";
import { ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const MarketplacePage = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTrades();

  const loaderRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  const trades = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="relative rounded-2xl overflow-hidden bg-surface border border-background p-10 flex flex-col items-center text-center gap-6">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Marketplace de Cartas
          </span>

          <h1 className="text-4xl font-bold text-text leading-tight">
            Troque suas cartas com{" "}
            <span className="text-primary">jogadores do mundo todo</span>
          </h1>

          <p className="text-text-muted max-w-lg">
            Encontre as cartas que você precisa e ofereça as que você tem. O
            maior marketplace de trocas de cartas.
          </p>

          <div className="flex gap-3 mt-2">
            <Link
              to="/registro"
              className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Criar conta grátis
            </Link>
            <Link
              to="/login"
              className="border border-surface text-text font-semibold px-6 py-2.5 rounded-xl hover:bg-surface transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-text font-bold text-lg">Trocas abertas</h2>
          {!isLoading && (
            <span className="text-text-muted text-sm">
              {trades.length} troca(s) encontrada(s)
            </span>
          )}
        </div>

        {isLoading ? (
          <LoadingState message="Carregando trocas..." />
        ) : trades.length === 0 ? (
          <EmptyState
            icon={<ArrowRightLeft size={32} />}
            title="Nenhuma troca encontrada"
            description="Ainda não há trocas abertas no marketplace"
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
      </div>
    </div>
  );
};
