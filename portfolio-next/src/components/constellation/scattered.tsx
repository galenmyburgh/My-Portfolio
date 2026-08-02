import { categories } from "@/content/tech";
import { constellation } from "@/lib/constellation";

/**
 * The 404 constellation: the same nodes, pushed apart, edges gone.
 *
 * A server component with no interaction — it is a picture of a broken graph,
 * so there is nothing to click and nothing to hydrate.
 */
export function ScatteredConstellation() {
  // Same layout, scaled outward from the centre so the shape is recognisable
  // but visibly come apart.
  const scattered = constellation.nodes.map((node, i) => ({
    ...node,
    x: node.x * (1.28 + ((i % 7) * 0.05)),
    y: node.y * (1.28 + ((i % 5) * 0.06)),
  }));

  return (
    <div aria-hidden="true" className="relative aspect-2/1 w-full max-w-md">
      {scattered.map((node) => (
        <span
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45"
          style={{
            left: `${50 + node.x * 38}%`,
            top: `${50 + node.y * 34}%`,
            width: `${node.r}px`,
            height: `${node.r}px`,
            backgroundColor: categories[node.category].color,
          }}
        />
      ))}
    </div>
  );
}
