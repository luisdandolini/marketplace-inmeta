import { useNavigate } from "react-router-dom";
import { useMe } from "../features/me/hooks/useMe";
import { useMyCards } from "../features/card/hooks/useCards";
import { useTrades } from "../features/trades/hooks/useTrades";
import { Button } from "../shared/components/Button";
import {
  LayoutGrid,
  ArrowRightLeft,
  Layers,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: myCards = [] } = useMyCards();
  const {
    data: tradesData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useTrades();

  const allTrades = tradesData?.pages.flatMap((page) => page.list) ?? [];
  const myTrades = allTrades.filter((trade) => trade.userId === me?.id);

  const STATS = [
    {
      label: "Minhas Cartas",
      value: myCards.length,
      icon: <LayoutGrid size={20} />,
      path: "/cartas/minhas-cartas",
    },
    {
      label: "Minhas Trocas",
      value: myTrades.length,
      icon: <ArrowRightLeft size={20} />,
      path: "/trocas/minhas-trocas",
    },
    {
      label: "Trocas no Marketplace",
      value: allTrades.length,
      icon: <Layers size={20} />,
      path: "/trocas",
    },
  ];

  const QUICK_ACTIONS = [
    {
      title: "Minhas Cartas",
      description: "Gerencie sua coleção de cartas",
      icon: <LayoutGrid size={24} />,
      path: "/cartas/minhas-cartas",
      label: "Ver coleção",
    },
    {
      title: "Explorar Cartas",
      description: "Descubra novas cartas disponíveis",
      icon: <Layers size={24} />,
      path: "/cartas/explorar-cartas",
      label: "Explorar",
    },
    {
      title: "Marketplace",
      description: "Veja todas as trocas abertas",
      icon: <ArrowRightLeft size={24} />,
      path: "/trocas",
      label: "Acessar marketplace",
    },
  ];

  useEffect(() => {
    if (
      !isLoading &&
      myTrades.length === 0 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    myTrades.length,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  ]);

  useEffect(() => {
    if (!isLoading && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-text">
            Bem vindo, {me?.name}!
          </h1>
          <p className="text-xs md:text-base text-text-muted mt-1">
            O que você quer fazer hoje?
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            onClick={() => navigate(stat.path)}
            className="bg-background rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary border border-transparent transition-colors"
          >
            <div className="text-primary bg-primary/10 p-3 rounded-lg">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-text font-semibold mb-4">Acesso rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <div
              key={action.path}
              onClick={() => navigate(action.path)}
              className="bg-background rounded-xl p-6 flex flex-col gap-4 cursor-pointer hover:border-primary border border-transparent transition-colors group"
            >
              <div className="text-primary">{action.icon}</div>
              <div>
                <h3 className="text-text font-semibold">{action.title}</h3>
                <p className="text-text-muted text-sm mt-1">
                  {action.description}
                </p>
              </div>
              <span className="flex items-center gap-2 text-primary text-sm font-medium group-hover:underline">
                {action.label} <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
