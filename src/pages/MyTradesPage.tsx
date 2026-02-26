import { useTrades, useDeleteTrade } from "../features/trades/hooks/useTrades";
import { TradeItem } from "../features/trades/components/TradeItem";
import { LoadingState } from "../shared/components/LoadingState";
import { EmptyState } from "../shared/components/EmptyState";
import { Button } from "../shared/components/Button";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll";
import { ArrowRightLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMe } from "../features/me/hooks/useMe";
import { useToast } from "../shared/components/ToastContext";

export const MyTradesPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: me } = useMe();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTrades();
  const { mutate: deleteTrade } = useDeleteTrade();

  const loaderRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  const allTrades = data?.pages.flatMap((page) => page.list) ?? [];
  const myTrades = allTrades.filter((trade) => trade.userId === me?.id);

  const handleDelete = (id: string) => {
    deleteTrade(id, {
      onSuccess: () => showToast("Troca deletada com sucesso!"),
      onError: () => showToast("Erro ao deletar troca", "error"),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Minhas Trocas</h1>
          <p className="text-text-muted text-sm mt-1">
            {myTrades.length} troca(s) ativa(s)
          </p>
        </div>
        <Button
          onClick={() => navigate("/trocas/nova")}
          className="flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Nova Troca
        </Button>
      </div>

      {isLoading ? (
        <LoadingState message="Carregando suas trocas..." />
      ) : myTrades.length === 0 ? (
        <EmptyState
          icon={<ArrowRightLeft size={32} />}
          title="Nenhuma troca encontrada"
          description="Crie sua primeira troca!"
          action={
            <Button onClick={() => navigate("/trocas/nova")}>
              Criar troca
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {myTrades.map((trade) => (
            <TradeItem key={trade.id} trade={trade} onDelete={handleDelete} />
          ))}
          <div ref={loaderRef} className="py-4">
            {isFetchingNextPage && (
              <LoadingState message="Carregando mais trocas..." />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
